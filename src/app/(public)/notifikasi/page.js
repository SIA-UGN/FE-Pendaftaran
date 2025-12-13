"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import {
  useClearReadNotifications,
  useDeleteNotification,
  useMarkAllAsRead,
  useMarkAsRead,
  useNotifications,
} from "@/hooks/useNotification";
import { CheckCheck, Trash2, Mail } from "lucide-react";
import toast from "react-hot-toast";

const formatMessage = (message) => {
  if (!message) return "";

  const hasMarkdownBold = /\*\*([^*]+)\*\*/.test(message);

  if (hasMarkdownBold) {
    const parts = message.split(/\*\*([^*]+)\*\*:\s*/);
    const formatted = [];

    for (let i = 1; i < parts.length; i += 2) {
      const heading = parts[i];
      const content = parts[i + 1]?.trim();

      if (heading && content) {
        formatted.push(
          <div key={i} className="mb-4 last:mb-0">
            <p className="font-bold text-[var(--green)] text-base mb-1.5">
              {heading}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed pl-3 whitespace-pre-line">
              {content}
            </p>
          </div>
        );
      }
    }

    return formatted.length > 0 ? (
      formatted
    ) : (
      <p className="text-sm text-gray-700 whitespace-pre-line">{message}</p>
    );
  }

  const sections = message.split(/---/);

  return sections
    .map((section, idx) => {
      const trimmedSection = section.trim();
      if (!trimmedSection) return null;

      const lines = trimmedSection.split("\n");
      const firstLine = lines[0].trim();

      const isHeading =
        firstLine === firstLine.toUpperCase() &&
        firstLine.length > 0 &&
        /^[A-Z\s]+$/.test(firstLine);

      if (isHeading && lines.length > 1) {
        const content = lines.slice(1).join("\n").trim();
        return (
          <div key={idx} className="mb-4 last:mb-0">
            <p className="font-bold text-[var(--green)] text-base mb-1.5">
              {firstLine}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed pl-3 whitespace-pre-line">
              {content}
            </p>
          </div>
        );
      } else {
        return (
          <p
            key={idx}
            className="text-sm text-gray-700 leading-relaxed mb-2 last:mb-0 whitespace-pre-line"
          >
            {trimmedSection}
          </p>
        );
      }
    })
    .filter(Boolean);
};

export default function Notification() {
  const {
    data: notificationData,
    isLoading,
    isError,
    error,
  } = useNotifications();

  const { mutate: markAsRead, isPending: isLoadingMarkAsRead } =
    useMarkAsRead();
  const { mutate: markAllAsRead, isPending: isLoadingMarkAllAsRead } =
    useMarkAllAsRead();
  const { mutate: deleteNotification, isPending: isLoadingDeleteNotification } =
    useDeleteNotification();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading....</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  const data = notificationData?.data?.data?.notifications || [];
  const hasUnreadNotifications = data.some(
    (notification) => !notification.read_at
  );
  const hasReadNotifications = data.some(
    (notification) => notification.read_at
  );

  const handleRead = (id) => {
    markAsRead(id, {
      onSuccess: () => {
        toast.success("Notification marked as read");
      },
      onError: () => {
        toast.error("Failed to mark notification as read");
      },
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(undefined, {
      onSuccess: () => {
        toast.success("All notifications marked as read");
      },
      onError: () => {
        toast.error("Failed to mark all notifications as read");
      },
    });
  };

  const handleDelete = (id) => {
    deleteNotification(id, {
      onSuccess: () => {
        toast.success("Notification deleted");
      },
      onError: () => {
        toast.error("Failed to delete notification");
      },
    });
  };

  console.log(notificationData);
  console.log(data);

  return (
    <div className="flex flex-col items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full max-w-7xl mx-auto">
      <Heading title="Notification" variant="first" />

      {/* Action Buttons */}
      {data.length > 0 && (
        <div className="flex flex-wrap gap-2 md:gap-3 w-full mb-6">
          {hasUnreadNotifications && (
            <Button
              onClick={handleMarkAllAsRead}
              disabled={isLoadingMarkAllAsRead}
              variant="green"
              className="text-white"
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              {isLoadingMarkAllAsRead ? "Processing..." : "Mark All as Read"}
            </Button>
          )}
          {hasReadNotifications && (
            <>
            </>
            // <Button
            //   onClick={handleClearRead}
            //   disabled={isLoadingClearReadNotifications}
            //   variant="outline"
            //   className="border-red-600 text-red-600 hover:bg-red-50"
            // >
            //   <Trash2 className="w-4 h-4 mr-2" />
            //   {isLoadingClearReadNotifications ? "Clearing..." : "Clear Read"}
            // </Button>
          )}
        </div>
      )}

      {/* Notifications List */}
      <div className="flex flex-col gap-4 md:gap-6 w-full">
        {data.length === 0 ? (
          <Card className="p-8 md:p-12 flex flex-col items-center justify-center gap-4">
            <Mail className="w-16 h-16 text-gray-300" />
            <p className="text-gray-500 text-center">No notifications yet</p>
          </Card>
        ) : (
          data.map((notification, index) => (
            <Card
              key={`notifikasi-${index}`}
              className={`relative p-4 md:p-5 lg:p-6 flex flex-col gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow 
                ${
                  notification.read_at ? "opacity-70 bg-gray-50" : "opacity-100"
                }`}
            >
              {/* Status Indicator */}
              {!notification.read_at && (
                <div className="absolute top-3 left-3 w-2 h-2 bg-green-600 rounded-full"></div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {!notification.read_at && (
                  <button
                    onClick={() => handleRead(notification.id)}
                    disabled={isLoadingMarkAsRead}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => handleDelete(notification.id)}
                  disabled={isLoadingDeleteNotification}
                  className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>

              {/* Content */}
              <div className="pr-32 md:pr-36">
                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-[var(--green)] break-words">
                  {notification.title}
                </h1>
              </div>

              {/* Formatted Message */}
              <div className="pr-4 bg-white rounded-lg p-3 border border-gray-100">
                {formatMessage(notification.message)}
              </div>

              {/* Timestamp */}
              {notification.created_at && (
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(notification.created_at).toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
