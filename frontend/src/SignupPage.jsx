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
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,20}$/;
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
    
    <div className="background">
      <form onSubmit={handleSubmit(onSignUp)} className="form-card">
        
        {/* Introduction */}
        <div className="form-title">Welcome, Newcomer 👋</div>
        <div className="form-subtitle">Let's get you Signed Up!</div>

        {/* Username Form */}
        { errors.username && <p className="error-message">{errors.username.message}</p> }
        <div className="auth">
          <div className="auth-label">Username</div>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: "Username is required" }}
            render={({ field }) => <input {...field} className="auth-input" />}
          />
        </div>

        {/* Password Form */}
        {errors.secret && <p className="error-message">{errors.secret.message}</p>}
        <div className="auth">
          <div className="auth">
            <div className="auth-label">Password</div>
            <Controller
              name="secret"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                validate: (value) => {
                  if (!/[A-Za-z]/.test(value))
                    return "Password must contain letters";
                  if (!/\d/.test(value)) return "Password must contain numbers";
                  if (!/[@$!%*#?&.]/.test(value))
                    return "Password must contain special characters";
                  if (!/.{7,20}/.test(value))
                    return "Password must be 8-20 characters long";
                  return true;
                },
              }}
              render={({ field }) => (
                <input {...field} type="password" className="auth-input" />
              )}
            />
            
          </div>
        </div>

        {/* Email Form */}
        {errors.email && <p className="error-message">{errors.email.message}</p>}
        <div className="auth">
          <div className="auth-label">Email (Optional)</div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input {...field} type="email" className="auth-input" />
            )}
          />
          
        </div>

        {/* First Name Form */}
        <div className="auth">
          <div className="auth-label">First Name (Optional)</div>
          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} className="auth-input" />}
          />
          {errors.first_name && <p>{errors.first_name.message}</p>}
        </div>

        {/* Last Name Form */}
        <div className="auth">
          <div className="auth-label">Last Name (Optional)</div>
          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} className="auth-input" />}
          />
          {errors.last_name && <p>{errors.last_name.message}</p>}
        </div>

        {/* Sign Up Button */}
        <button className="auth-button" type="submit">
          SIGN UP
        </button>

        <button className="check-button" type="button">
          Already Have An Account? Log In Here!
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
