import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/stores/auth';

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
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex w-full">
      <img
        className="w-1/2 hidden md:block object-cover"
        src="/bruger-telefon-i-skoven.jpg"
        alt="User using phone in forest"
      />
      <div className="md:w-1/2 items-center m-auto">
        <div className="md:w-[350px] p-8 md:p-0 mx-auto">
          <img src="/Logo_slogan.png" alt="Logo_slogan" />
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 mt-4 ml-4 text-sm font-medium text-gray-900 dark:text-white">
              login
            </label>
            <Input
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleChange}
            />

            <label className="block mb-2 mt-4 ml-4 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
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
                <label className="ml-2" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-blue-500 cursor-pointer"
              type="submit"
            >
              Sign in
            </Button>

            <hr className="my-8" />

            <Button className="w-full cursor-pointer">
              sign in with e-mail link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
