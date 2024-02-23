"use client";

import getBaseURL from "@/libs/getBaseURL";
import { ToastContainer, toast } from "react-toast";
import { useState } from "react";

const ContactAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submitMessage = async (e) => {
    e.preventDefault();

    const body = {
      emailUser: email,
      name,
      subject,
      message,
    };

    console.log(body);

    try {
      const req = await fetch(getBaseURL("send-message"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const response = await req.json();
      if (req.ok) {
        alert("Success Send Message");
      } else {
        throw new Error(`Request failed with status ${req.status}`);
      }
    } catch (error) {
      const toast = () => toast.error(`Error: ${error}`);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-rinjaniVisitor-green w-full max-w-md p-2 text-white rounded-lg border-8 border-rinjaniVisitor-green/50"
      >
        Contact Admin
      </button>
      <div
        className={`fixed w-full h-screen bg-black/80 top-0 left-0 z-[9999] flex items-center justify-center ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300`}
      >
        <div className="w-full max-w-2xl bg-white p-6 rounded-md text-black relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4"
          >
            ✕
          </button>
          <h1 className="text-center font-semibold text-xl">Contact Admin</h1>
          <p className="text-center">
            Give us your feedback and help us improve our services
          </p>
          <form
            className="grid md:grid-cols-2 gap-4 mt-2"
            onSubmit={submitMessage}
          >
            <div className="flex flex-col justify-between">
              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="jhon@gmail.com"
                  required
                />
              </div>
              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Joh Doe"
                  required
                />
              </div>
              <div>
                <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Subject
                </label>
                <input
                  type="text"
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Offering"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Message
              </label>
              <textarea
                name=""
                id=""
                rows={10}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="col-span-full text-center">
              <button
                className="bg-green-700 w-full p-2 rounded text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactAdmin;
