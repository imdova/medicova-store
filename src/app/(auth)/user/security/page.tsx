"use client";

import Modal from "@/components/UI/Modals/DynamicModal";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type PasswordFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const SecuritySettingsPage = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  const onSubmit = (data: PasswordFormInputs) => {
    alert("Password changed successfully");
    setShowPasswordModal(false);
    reset();
    console.log(data);
  };

  const handleAccountDeletion = () => {
    alert("Account deletion request submitted");
    setShowDeleteConfirmation(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Security Settings</h1>
      </div>

      {/* Security Section */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Security</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Password</p>
            <p className="text-sm text-gray-500">••••••••</p>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="rounded-md bg-green-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-green-700"
          >
            CHANGE PASSWORD
          </button>
        </div>
      </div>

      {/* Account Deletion Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Account Deletion
        </h2>
        {!showDeleteConfirmation ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              We are sad to see you go, but hope to see you again!
            </p>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-700 sm:mt-0"
            >
              Delete your account
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeletion}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Password Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
            />
            {errors.newPassword && (
              <p className="text-sm text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowPasswordModal(false);
                reset();
              }}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SecuritySettingsPage;
