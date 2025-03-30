import { useState, useEffect } from "react";
import { MessageCircleMore } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MessengerChat = () => {
  const pageId = "61574221054676"; // ID Fanpage của bạn
  const messengerLink = `https://m.me/${pageId}`;

  const [hover, setHover] = useState(false);
  const [autoShow, setAutoShow] = useState(false);
  const [ripple, setRipple] = useState(false);

  // Hiển thị tooltip tự động mỗi 10 giây
  useEffect(() => {
    const tooltipInterval = setInterval(() => {
      setAutoShow(true);
      setTimeout(() => setAutoShow(false), 2000);
    }, 8000);

    return () => clearInterval(tooltipInterval);
  }, []);

  // Hiệu ứng "nước gợn" mỗi 8 giây
  useEffect(() => {
    const rippleInterval = setInterval(() => {
      setRipple(true);
      setTimeout(() => setRipple(false), 1500);
    }, 8000);

    return () => clearInterval(rippleInterval);
  }, []);

  return (
    <div className="fixed bottom-16 right-6 flex items-center space-x-3 z-50">
      {/* Tooltip "Chat với chúng tôi" */}
      <AnimatePresence>
        {(hover || autoShow) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-md"
          >
            Liên hệ với chúng tôi
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút Messenger với hiệu ứng ripple */}
      <motion.div className="relative">
        {/* Hiệu ứng ripple (sóng loang ra đẹp hơn) */}
        {ripple && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-red-500 rounded-full"
              style={{ filter: "blur(20px)" }}
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-red-300 rounded-full"
              style={{ filter: "blur(25px)" }}
            />
          </>
        )}

        {/* Nút Messenger */}
        <motion.a
          href={messengerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full shadow-xl hover:shadow-2xl transition duration-300"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: ripple ? 1 : 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <MessageCircleMore size={32} className="text-white" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default MessengerChat;
