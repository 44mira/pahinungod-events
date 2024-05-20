"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <div className=" text-end text-white">
        <Button
          className="text-xsm"
          size={"sm"}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Save" : "Edit Profile"}
        </Button>
      </div>
      <div className="w-96 space-y-9">
        <div>
          <Label htmlFor="username" className="font-bold text-slate-600">
            Username
            {editMode ? (
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Change username"
                className=" bg-slate-200 border-blue-500 border-2 ms-3 font-normal placeholder:text-gray-400 "
              />
            ) : (
              <p className="font-normal p-3 bg-slate-200 ms-3 rounded-sm">
                {username}
              </p>
            )}
          </Label>
        </div>
        <div>
          <Label htmlFor="password" className="font-bold text-slate-600">
            Password
            {editMode ? (
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Change password"
                className=" bg-slate-200 border-blue-500 border-2 ms-3 font-normal placeholder:text-gray-400 "
              />
            ) : (
              <p className="font-normal p-3 bg-slate-200 ms-3 rounded-sm">
                {password}
              </p>
            )}
          </Label>
        </div>
        <div>
          <Label htmlFor="name" className="font-bold text-slate-600">
            Name
            {editMode ? (
              <Input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Change name"
                className=" bg-slate-200 border-blue-500 border-2 ms-3 font-normal placeholder:text-gray-400 "
              />
            ) : (
              <p className="font-normal p-3 bg-slate-200 ms-3 rounded-sm">
                {name}
              </p>
            )}
          </Label>
        </div>
      </div>
    </>
  );
}
