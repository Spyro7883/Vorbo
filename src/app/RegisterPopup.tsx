
require("dotenv").config()
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type FormRegisterSchema = {
    name: string
    email: string
    password: string

}

const RegisterPopup = () => {
    const { register, handleSubmit } = useForm<FormRegisterSchema>()
    const onSubmit: SubmitHandler<FormRegisterSchema> = async (data) => {
        try {
            const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <section className="max-w-56 border-2 rounded-lg bg-white pb-2 pt-2">
            <h1 className="flex justify-center pb-2 text-black">User Registration</h1>
            <form method="post" className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <input className="bg-transparent outline-none text-black px-6" type="text" placeholder="Name" {...register("name")} />
                <input className="bg-transparent outline-none text-black px-6" type="email" placeholder="Email" {...register("email")} />
                <input className="bg-transparent outline-none text-black px-6" type="password" placeholder="Password" {...register("password")} />
                <button className="text-black" type="submit">Submit</button>
            </form>
        </section>
    );
};

export default RegisterPopup;