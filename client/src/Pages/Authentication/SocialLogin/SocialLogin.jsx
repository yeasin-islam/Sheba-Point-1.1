import { Facebook } from 'lucide-react';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';
const SocialLogin = () => {

     const navigate = useNavigate();
     const {user, signInWithGoogle} = useAuth();
     const axios = useAxios();

     const handleSubmit = () =>{
       signInWithGoogle().then(async() => {
        console.log(user)
        // saving user data to db
        const userData = {
          email: user.email,
          name: user.displayName,
          role: "user",
          lastLogin: user.metadata.lastSignInTime,
          creationTime: user.metadata.creationTime,
        };
        axios.post("/users", userData)
          .then((response) => {
            console.log("User data saved:", response.data);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
         navigate('/');
       });
     }
    return (
        <div>
             <div className="grid grid-cols-2 gap-3">
              <button onClick={handleSubmit} type="button" className="btn btn-outline w-full"  >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                Google
              </button>
             
              <button type="button" className="btn btn-outline w-full"  >
                <Facebook size={18} />
                Facebook
              </button>
            </div>
        </div>
    );
};

export default SocialLogin;