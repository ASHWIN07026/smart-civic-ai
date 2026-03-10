import base64
import io
import os
import re
import numpy as np

# Department mapping
DEPT_MAP = {
    "Garbage": "Sanitation Department",
    "Pothole": "Roads & Infrastructure",
    "Streetlight": "Electricity Department",
    "Water Leakage": "Water Board",
    "Other": "General Municipal Office",
}

# NLP keyword rules for text-based classification
NLP_KEYWORDS = {
    "Garbage": [
        "garbage", "trash", "waste", "litter", "dump", "rubbish",
        "sewage", "smell", "stink", "overflow", "bin", "sanitation",
    ],
    "Pothole": [
        "pothole", "pit", "road", "crack", "broken road", "damaged road",
        "accident", "uneven", "crater", "bump", "surface", "highway",
    ],
    "Streetlight": [
        "light", "streetlight", "lamp", "dark", "not working", "broken light",
        "electricity", "bulb", "illuminate", "night", "street lamp",
    ],
    "Water Leakage": [
        "water", "leak", "pipe", "flood", "drain", "sewage", "overflow",
        "burst", "puddle", "tap", "supply", "shortage", "clog",
    ],
}

def classify_by_text(description: str) -> tuple[str, float]:
    """Classify based on keyword matching in description text."""
    if not description:
        return "Other", 0.0

    text = description.lower()
    scores = {cat: 0 for cat in NLP_KEYWORDS}

    for category, keywords in NLP_KEYWORDS.items():
        for kw in keywords:
            if re.search(rf"\b{re.escape(kw)}\b", text):
                scores[category] += 1

    best_cat = max(scores, key=scores.get)
    best_score = scores[best_cat]

    if best_score == 0:
        return "Other", 0.3

    # Normalize confidence: cap at 0.95
    confidence = min(0.5 + (best_score / len(NLP_KEYWORDS[best_cat])) * 0.45, 0.95)
    return best_cat, round(confidence, 2)


def classify_by_image(image_base64: str) -> tuple[str, float]:
    """
    Classify complaint image using MobileNetV2 transfer learning.
    Falls back to None if model not loaded or image invalid.
    """
    if not image_base64:
        return None, 0.0

    try:
        import tensorflow as tf
        from PIL import Image

        MODEL_PATH = os.environ.get("MODEL_PATH", "model/civic_model.h5")
        CATEGORIES = ["Garbage", "Pothole", "Streetlight", "Water Leakage", "Other"]
        IMG_SIZE = 224

        # Load model (cached after first load)
        if not hasattr(classify_by_image, "_model"):
            if os.path.exists(MODEL_PATH):
                classify_by_image._model = tf.keras.models.load_model(MODEL_PATH)
                print("Loaded trained civic model.")
            else:
                print("No trained model found — image classification skipped.")
                classify_by_image._model = None

        model = classify_by_image._model
        if model is None:
            return None, 0.0

        # Decode base64 image
        img_bytes = base64.b64decode(image_base64)
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((IMG_SIZE, IMG_SIZE))
        arr = np.array(img) / 255.0
        arr = np.expand_dims(arr, axis=0)

        preds = model.predict(arr, verbose=0)[0]
        best_idx = int(np.argmax(preds))
        return CATEGORIES[best_idx], round(float(preds[best_idx]), 2)

    except Exception as e:
        print(f"Image classification error: {e}")
        return None, 0.0


def classify_complaint(image_base64: str, description: str) -> dict:
    """
    Main classification function — combines image + text signals.
    """
    text_category, text_conf = classify_by_text(description)
    img_category, img_conf = classify_by_image(image_base64)

    # Combine: if both available, weight image 60% + text 40%
    if img_category and img_conf > 0.5:
        if img_category == text_category:
            # Agreement — boost confidence
            final_category = img_category
            final_conf = round(min(img_conf * 0.6 + text_conf * 0.4 + 0.05, 0.99), 2)
        else:
            # Disagreement — trust higher confidence
            if img_conf >= text_conf:
                final_category = img_category
                final_conf = round(img_conf * 0.7, 2)
            else:
                final_category = text_category
                final_conf = round(text_conf * 0.7, 2)
    else:
        # No image or low image confidence — use text only
        final_category = text_category
        final_conf = text_conf

    return {
        "category": final_category,
        "confidence": final_conf,
        "suggestedDepartment": DEPT_MAP.get(final_category, "General Municipal Office"),
        "textCategory": text_category,
        "textConfidence": text_conf,
        "imageCategory": img_category,
        "imageConfidence": img_conf,
    }
