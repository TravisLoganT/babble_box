import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useForm, Controller } from "react-hook-form";

const SignupPage = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const pattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,20}$/;

  const onSignUp = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/signup", data);
      props.onAuth({ ...response.data, secret: data.secret });
    } catch (e) {
      console.log(JSON.stringify(e.response.data));
    }
  };
  {
    errors.username && <p>{errors.username.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      <div className="title">Sign Up</div>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: "Username is required" }}
        render={({ field }) => <input {...field} placeholder="Username" />}
      />

      <Controller
        name="secret"
        control={control}
        defaultValue=""
        rules={{
          required: "Password is required",
          validate: (value) => {
            if (!/[A-Za-z]/.test(value)) return "Password must contain letters";
            if (!/\d/.test(value)) return "Password must contain numbers";
            if (!/[@$!%*#?&]/.test(value))
              return "Password must contain special characters";
            if (!/.{8,20}/.test(value))
              return "Password must be 8-20 characters long";
            return true;
          },
        }}
        render={({ field }) => (
          <input {...field} type="password" placeholder="Password" />
        )}
      />
      {errors.secret && <p>{errors.secret.message}</p>}

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} type="email" placeholder="Email (Optional)" />
        )}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <Controller
        name="first_name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} placeholder="First Name (Optional)" />
        )}
      />
      {errors.first_name && <p>{errors.first_name.message}</p>}

      <Controller
        name="last_name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input {...field} placeholder="Last Name (Optional)" />
        )}
      />
      {errors.last_name && <p>{errors.last_name.message}</p>}

      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default SignupPage;
