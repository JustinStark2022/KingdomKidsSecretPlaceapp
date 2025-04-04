import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const SignupForm = () => {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    displayName: "",
    isParent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      username: form.username,
      password: form.password,
      displayName: form.displayName,
      role: form.isParent ? "parent" : "child"
    };
    await signup(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="input"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="input"
      />
      <input
        name="displayName"
        placeholder="Display Name"
        onChange={handleChange}
        className="input"
      />
      <label className="inline-flex items-center">
        <input
          name="isParent"
          type="checkbox"
          checked={form.isParent}
          onChange={handleChange}
          className="mr-2"
        />
        Register as Parent
      </label>
      <button type="submit" className="btn mt-4">Sign Up</button>
    </form>
  );
};

export default SignupForm;
