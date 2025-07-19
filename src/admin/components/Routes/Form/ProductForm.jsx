import { useState } from "react"
import "./ProductForm.css" // Import the new CSS file

export default function ProductForm() {
  const [images, setImages] = useState([""])
  const [errors, setErrors] = useState({}) // State to store validation errors

  const handleImageChange = (idx, value) => {
    const newImages = [...images]
    newImages[idx] = value
    setImages(newImages)
    // Clear image URL error if input becomes valid
    if (errors[`imageUrl${idx}`] && value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[`imageUrl${idx}`]
        return newErrors
      })
    }
  }

  const addImageField = () => {
    if (images.length < 10) setImages([...images, ""])
  }

  const removeImageField = (idx) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== idx))
      // Remove error for the deleted field
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[`imageUrl${idx}`]
        return newErrors
      })
    }
  }

  const validateForm = (formData) => {
    const newErrors = {}

    // Product Name
    if (!formData.get("productName").trim()) {
      newErrors.productName = "Product Name is required."
    }

    // Full Product Description (optional, but could add min length)
    // if (formData.get("fullDescription").trim().length < 10) {
    //   newErrors.fullDescription = "Full Description must be at least 10 characters."
    // }

    // Product Images URLs
    images.forEach((img, idx) => {
      if (idx === 0 && !img.trim()) {
        newErrors[`imageUrl${idx}`] = "At least one image URL is required."
      } else if (img.trim() && !/^https?:\/\/\S+\.\S+/.test(img.trim())) {
        newErrors[`imageUrl${idx}`] = "Please enter a valid URL."
      }
    })

    // Price
    const price = Number.parseFloat(formData.get("price"))
    if (isNaN(price) || price < 0) {
      newErrors.price = "Price must be a non-negative number."
    } else if (!formData.get("price").trim()) {
      newErrors.price = "Price is required."
    }

    // Discount Price
    const discountPrice = Number.parseFloat(formData.get("discountPrice"))
    if (!isNaN(discountPrice) && discountPrice < 0) {
      newErrors.discountPrice = "Discount Price must be a non-negative number."
    }
    if (!isNaN(price) && !isNaN(discountPrice) && discountPrice >= price) {
      newErrors.discountPrice = "Discount Price must be less than the Price."
    }

    // Affiliate Link
    const affiliateLink = formData.get("affiliateLink").trim()
    if (affiliateLink && !/^https?:\/\/\S+\.\S+/.test(affiliateLink)) {
      newErrors.affiliateLink = "Please enter a valid URL for Affiliate Link."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    if (validateForm(formData)) {
      // Form is valid, proceed with submission
      const productData = {
        productName: formData.get("productName"),
        shortDescription: formData.get("shortDescription"),
        fullDescription: formData.get("fullDescription"),
        images: images.filter(Boolean), // Filter out empty strings
        price: Number.parseFloat(formData.get("price")),
        discountPrice: Number.parseFloat(formData.get("discountPrice")) || null,
        affiliateLink: formData.get("affiliateLink"),
        brandName: formData.get("brandName"),
        category: formData.get("category"),
        tags: formData.get("tags"),
      }
      console.log("Form is valid! Submitting data:", productData)
      // Here you would typically send data to your backend
      alert("Form submitted successfully! Check console for data.")
    } else {
      console.log("Form has validation errors:", errors)
    }
  }

  // Generic input change handler to clear errors on typing
  const handleInputChange = (e) => {
    const { name } = e.target
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <form className="product-form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Add / Edit Product</h2>

      <div className="form-group">
        <label htmlFor="productName" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          className={`form-input ${errors.productName ? "input-error" : ""}`}
          name="productName"
          required
          onChange={handleInputChange}
        />
        {errors.productName && <p className="error-message">{errors.productName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="shortDescription" className="form-label">
          Short Description
        </label>
        <input
          type="text"
          id="shortDescription"
          className="form-input"
          name="shortDescription"
          maxLength={120}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fullDescription" className="form-label">
          Full Product Description
        </label>
        <textarea
          id="fullDescription"
          className="form-textarea"
          name="fullDescription"
          rows={4}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Product Images URLs</label>
        {images.map((img, idx) => (
          <div className="image-input-group" key={idx}>
            <input
              type="url"
              className={`form-input ${errors[`imageUrl${idx}`] ? "input-error" : ""}`}
              placeholder={`Image URL #${idx + 1}`}
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              required={idx === 0}
            />
            {images.length > 1 && (
              <button type="button" className="btn-remove-image" onClick={() => removeImageField(idx)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            )}
          </div>
        ))}
        {images.map(
          (_, idx) =>
            errors[`imageUrl${idx}`] && (
              <p key={`error-${idx}`} className="error-message">
                {errors[`imageUrl${idx}`]}
              </p>
            ),
        )}
        <button type="button" className="btn-add-image" onClick={addImageField} disabled={images.length >= 10}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Add Image
        </button>
        <div className="form-text">Maximum 10 images allowed.</div>
      </div>

      <div className="form-group">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          id="price"
          className={`form-input ${errors.price ? "input-error" : ""}`}
          name="price"
          min={0}
          step="0.01"
          required
          onChange={handleInputChange}
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="discountPrice" className="form-label">
          Discount Price / Offer Price
        </label>
        <input
          type="number"
          id="discountPrice"
          className={`form-input ${errors.discountPrice ? "input-error" : ""}`}
          name="discountPrice"
          min={0}
          step="0.01"
          onChange={handleInputChange}
        />
        {errors.discountPrice && <p className="error-message">{errors.discountPrice}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="affiliateLink" className="form-label">
          Affiliate Link
        </label>
        <input
          type="url"
          id="affiliateLink"
          className={`form-input ${errors.affiliateLink ? "input-error" : ""}`}
          name="affiliateLink"
          onChange={handleInputChange}
        />
        {errors.affiliateLink && <p className="error-message">{errors.affiliateLink}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="brandName" className="form-label">
          Brand Name
        </label>
        <input type="text" id="brandName" className="form-input" name="brandName" onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input type="text" id="category" className="form-input" name="category" onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="tags" className="form-label">
          Tags / Keywords
        </label>
        <input
          type="text"
          id="tags"
          className="form-input"
          name="tags"
          placeholder="Comma separated"
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  )
}
