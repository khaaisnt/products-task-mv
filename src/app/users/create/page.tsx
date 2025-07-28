"use client";

import React from "react";
import { useCreateUser } from "../services/createUser.service";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "../validations/user.schema";
import { Toaster } from "react-hot-toast";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type UserFormData = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  birthDate: string;
  username: string;
  password: string;
};

export default function CreateUser() {
  const router = useRouter();
  const { mutate, status } = useCreateUser();
  const isSubmitting = status === "pending";

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "male",
      email: "",
      phone: "",
      birthDate: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setTimeout(() => {
          router.push("/users");
        }, 1000);
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="container p-10 mx-auto">
        <Toaster position="top-center" />

        <Button
          onClick={router.back}
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
        >
          Back
        </Button>

        <div className="my-4">
          <Typography variant="h4">Create User</Typography>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextField
            label="First Name"
            fullWidth
            variant="outlined"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            fullWidth
            variant="outlined"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Age"
            type="text"
            fullWidth
            variant="outlined"
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              {...register("gender")}
              error={!!errors.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <div className="md:col-span-2">
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Birth Date"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  disabled={isSubmitting}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!errors.birthDate,
                      helperText: errors.birthDate?.message as string,
                    },
                  }}
                />
              )}
            />
          </div>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
}
