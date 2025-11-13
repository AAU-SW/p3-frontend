import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/stores/auth';
import { toast } from 'sonner';

export const Route = createFileRoute('/login/')({
  component: Login,
  beforeLoad: async ({ context }) => {
    const me = await context.auth.getCurrentUser();
    if (me) throw redirect({ to: '/' });
  },
});

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(formData.email, formData.password);
      navigate({ to: '/' });
    } catch (error) {
      console.error(error)
      toast.error('Login failed');
    }
  };

  return (
    <div className="flex w-full">
      <img
        className="w-4/10 hidden md:block object-cover"
        src="/Grainy-signup-pic.svg"
        alt="Grainy signup page of man holding phone"
      />
      <div className="md:w-6/10 items-center m-auto">
        <div className="md:w-[350px] p-8 md:p-0 mx-auto">
          <img src="/SporingsGruppenLogo_Full.svg" alt="Logo_slogan" />
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 mt-4 ml-4 text-sm font-medium text-gray-900 dark:text-white">
              Login
            </label>
            <Input
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleChange}
            />

            <Label className="block mb-2 mt-4 ml-4 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                name="password"
                placeholder="Enter Password"
                type={eye ? 'password' : 'text'}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                type="button"
                onClick={() => setEye(!eye)}
              >
                {eye ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className="flex items-center justify-between mt-6 -mb-1 pb-6">
              <div className="flex items-center">
                <Switch id="remember" />
                <Label className="ml-2" htmlFor="remember">
                  Remember me
                </Label>
              </div>
              <div>
                <Link to="/" className="text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-[#01204A] cursor-pointer"
              type="submit"
            >
              Sign in
            </Button>

            <hr className="my-8" />

            <Button className="w-full cursor-pointer">
              Sign in with e-mail link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
