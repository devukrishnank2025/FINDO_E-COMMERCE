import { useState, useEffect } from "react";
import "./SignupForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../redux/feature/userSlice";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[0-9]{10,15}$/;

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", contact: "", password: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

    const {loading}=useSelector((state) => state.user)

    const dispatch = useDispatch();

  // Free the object URL when the image changes or the component unmounts
  useEffect(() => {
    if (!image) return setPreview("");
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setErrors({ ...errors, image: "Please choose an image file" });
      return;
    }
    setErrors({ ...errors, image: "" });
    setImage(file || null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked');
    

    const data = new FormData();
    if (image) data.append("image", image);
    data.append("name", form.name);
    data.append("contact", form.contact);
    data.append("password", form.password);

 
    console.log("Submitted:", Object.fromEntries(data));
    alert("Form submitted!");
    dispatch(addUser(data))
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <h2>Sign Up</h2>

      {preview && <img src={preview} alt="Preview" className="preview" />}

      <label>
        Profile Image
        <input type="file" accept="image/*" onChange={handleImage} />
        {errors.image && <span className="error">{errors.image}</span>}
      </label>

      <label>
        Name
        <input
          className="input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Email or Phone
        <input
          className="input"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="you@example.com or +911234567890"
        />
        {errors.contact && <span className="error">{errors.contact}</span>}
      </label>

      <label>
        Password
        <input
          className="input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}