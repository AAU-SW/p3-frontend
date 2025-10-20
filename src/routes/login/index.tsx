import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
});


function RouteComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [eye, setEye] = useState(true);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle login logic here
	};
	return( 
	<div className="flex w-full">
		<img className="w-1/2 " src="/public/bruger-telefon-i-skoven.jpg" alt="hello" />
		<div className="w-1/2 items-center m-auto">
			<div className="w-[350px] mx-auto">
				<img src="/public/Logo_slogan.png" className="" alt="Logo_slogan" />
				<form onSubmit={handleSubmit}>
					<label className="block mb-2 mt-4 ml-4 text-sm font-medium text-gray-900 dark:text-white">login</label>
					<Input className="" placeholder="Email or phone number" value={email} onChange={(e) => setEmail(e.target.value)}/>
					
					<label className="block mb-2 mt-4 ml-4 text-sm font-medium text-gray-900 dark:text-white">Password</label>
					<div className="relative">
						<Input placeholder="Enter Password" type={eye ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)}/>
						<button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setEye(!eye)}>
							{eye ? <Eye /> : <EyeOff /> }
						</button>
					</div>
					<div>
					
					<div className="flex items-center justify-between mt-6 -mb-1 pb-6">
					  <div className="flex items-center">
					    <Switch />
					    <span className="ml-2">Remember me</span>
					  </div>
					  <div>
					    <a href="asdasd" className="text-blue-600 hover:underline">
					      Forgot password?
					    </a>
					  </div>
					</div>
					<Button className="w-full mt-6 bg-blue-500 cursor-pointer" type="submit">Sig in</Button>
					</div>
					<hr className="my-8" />
				</form>
				<Button className=" w-full cursor-pointer"> sign in white e-mail link </Button>
			</div>
		</div>
	</div>
	);
}
