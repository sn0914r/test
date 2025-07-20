import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap"; // Assuming you're using react-bootstrap for form elements
import "./ProductForm.css";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useParams } from "react-router-dom";


export default function ProductForm() {
  const [formState, setFormState] = useState({
    productName: "",
    shortDescription: "",
    fullDescription: "",
    images: [""],
    price: "",
    discountPrice: "",
    affiliateLink: "",
    brandName: "",
    category: "",
    tags: "",
  });

  const { id } = useParams();

  
  useEffect(()=>{
    if (id) {

      const fetchProductData = async () => {
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().images);
            const formData = {
              ...docSnap.data(),
              images: docSnap.data().images || [""], 
            }
            setFormState(formData);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product data: ", error);
        }
      };
      fetchProductData();
    }
  },[])

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error if input becomes valid
    if (errors[name] && value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (idx, value) => {
    const newImages = [...formState.images];
    newImages[idx] = value;
    setFormState((prev) => ({ ...prev, images: newImages }));

    // Clear image URL error if input becomes valid
    if (errors[`imageUrl${idx}`] && value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`imageUrl${idx}`];
        return newErrors;
      });
    }
  };

  const addImageField = () => {
    if (formState.images.length < 10) {
      setFormState((prev) => ({ ...prev, images: [...prev.images, ""] }));
    }
  };

  const removeImageField = (id) => {
    if (formState.images.length > 1) {
      const newImages = formState.images.filter((_, i) => i !== id);
      setFormState((prev) => ({ ...prev, images: newImages }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`imageUrl${id}`];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addProduct = async () => {
      console.log("Product data:", formState);

      try {
        await addDoc(collection(db, "products"), {
          productName: formState.productName,
          shortDescription: formState.shortDescription,
          fullDescription: formState.fullDescription,
          images: formState.images,
          price: parseFloat(formState.price),
          discountPrice: parseFloat(formState.discountPrice),
          affiliateLink: formState.affiliateLink,
          brandName: formState.brandName,
          category: formState.category,
          tags: formState.tags.split(",").map((tag) => tag.trim()),
          createdAt: serverTimestamp(),
          editedAt: null,
        });
        console.log("Product Added");
        alert("Form successfully Submitted");
        setFormState({
          productName: "",
          shortDescription: "",
          fullDescription: "",
          images: ["hi", "hello"],
          price: "",
          discountPrice: "",
          affiliateLink: "",
          brandName: "",
          category: "",
          tags: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again.");
        return;
      }
    };

    const editProduct = async () => {
      console.log("Editing product with ID:", id);
      try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
          ...formState,
          editedAt: serverTimestamp(),
        });
        console.log("Product Edited");
        alert("Form successfully Edited");
      } catch (error) {
        console.error("Error editing product:", error);
        alert("Error editing product. Please try again.");
      }
    }
    if (id) {
      editProduct();
    } else {
      if (!formState.productName || !formState.price || !formState.images[0]) {
        alert("Please fill in all required fields.");
        return;
      }
      addProduct();
    }
  };

  const removeBtnSVG = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
  const addImageSVG = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );

  return (
    <FormPresenter
      handleSubmit={handleSubmit}
      errors={errors}
      formState={formState}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      removeImageField={removeImageField}
      addImageField={addImageField}
      removeBtnSVG={removeBtnSVG}
      addImageSVG={addImageSVG}
    />
  );
}

const FormPresenter = ({
  handleSubmit,
  errors,
  formState,
  handleInputChange,
  removeBtnSVG,
  handleImageChange,
  removeImageField,
  addImageSVG,
  addImageField,
}) => (
  <Form className="product-form-container" onSubmit={handleSubmit}>
    <h3 className="form-title">Add / Edit Product</h3>

    <Form.Group className="mb-3" controlId="productName">
      <Form.Label className="form-label">Product Name</Form.Label>
      <Form.Control
        type="text"
        className={`form-input ${errors.productName && "input-error"}`}
        name="productName"
        required
        value={formState.productName}
        onChange={handleInputChange}
      />
      {errors.productName && (
        <p className="error-message">{errors.productName}</p>
      )}
    </Form.Group>

    <Form.Group className="mb-3" controlId="shortDescription">
      <Form.Label>Short Description</Form.Label>
      <Form.Control
        type="text"
        className="form-input"
        name="shortDescription"
        maxLength={120}
        value={formState.shortDescription}
        onChange={handleInputChange}
      />
      {errors.shortDescription && (
        <p className="error-message">{errors.shortDescription}</p>
      )}
    </Form.Group>

    <Form.Group className="mb-3" controlId="fullDescription">
      <Form.Label className="form-label">Full Product Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        name="fullDescription"
        value={formState.fullDescription}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label className="form-label">Product Images URLs</Form.Label>
      {formState.images.map((_, index) => (
        <Form.Group className="image-input-group" key={index}>
          <Form.Control
            type="text"
            className={`form-input ${
              errors[`imageUrl${index}`] && "input-error"
            }`}
            placeholder={`Image URL #${index + 1}`}
            value={formState.images[index]}
            onChange={(e) => handleImageChange(index, e.target.value)}
            required={index === 0}
          />
          {formState.images.length > 1 && (
            <Button
              type="button"
              className="btn-remove-image"
              onClick={() => removeImageField(index)}
            >
              {removeBtnSVG}
            </Button>
          )}
        </Form.Group>
      ))}

      {formState.images.map(
        (_, index) =>
          errors[`imageUrl${index}`] && (
            <p key={`error-${index}`} className="error-message">
              {errors[`imageUrl${index}`]}
            </p>
          )
      )}
      <Button
        type="button"
        className="btn-add-image"
        onClick={addImageField}
        disabled={formState.images.length >= 10}
      >
        {addImageSVG}
        Add Image
      </Button>
      <div className="form-text">Maximum 10 images allowed.</div>
    </Form.Group>

    <Form.Group className="mb-3" controlId="price">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        className={`form-input ${errors.price && "input-error"}`}
        name="price"
        min={0}
        step="0.01"
        required
        value={formState.price}
        onChange={handleInputChange}
      />
      {errors.price && <p className="error-message">{errors.price}</p>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="discountPrice">
      <Form.Label>Discount Price / Offer Price</Form.Label>
      <Form.Control
        type="number"
        className={`form-input ${errors.discountPrice && "input-error"}`}
        name="discountPrice"
        min={0}
        step="0.01"
        value={formState.discountPrice}
        onChange={handleInputChange}
      />
      {errors.discountPrice && (
        <p classNmae="error-message">{errors.discountPrice}</p>
      )}
    </Form.Group>

    <Form.Group className="mb-3" controlId="affiliateLink">
      <Form.Label>Affiliate Link</Form.Label>
      <Form.Control
        type="text"
        className={`form-input ${errors.affiliateLink && "input-error"}`}
        name="affiliateLink"
        value={formState.affiliateLink}
        onChange={handleInputChange}
      />
      {errors.affiliateLink && (
        <p className="error-message">{errors.affiliateLink}</p>
      )}
    </Form.Group>

    <Form.Group className="mb-3" controlId="brandName">
      <Form.Label>Brand Name</Form.Label>
      <Form.Control
        type="text"
        className="form-input"
        name="brandName"
        value={formState.brandName}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="brandName">
      <Form.Label>Category</Form.Label>
      <Form.Control
        type="text"
        className="form-input"
        name="category"
        value={formState.category}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="tags">
      <Form.Label>Tags / Keywords</Form.Label>
      <Form.Control
        type="text"
        className="form-input"
        name="tags"
        placeholder="Comma separated"
        value={formState.tags}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Button type="submit" className="btn-submit">
      Submit
    </Button>
  </Form>
);
