import { motion } from "framer-motion";

export default function Footer() {
  return (
    <div className="flex lg:px-36 lg:py-18 lg:justify-between lg:flex-row lg:space-y-0 space-y-5 flex-col py-20 px-16 bg-[#080808] items-center">
        <motion.img
          src="/mainlogo.png"
          className="lg:w-52 w-32"
        />
        <span className="lg:text-sm text-xs text-gray-400">Richter-Award copyright © 2022 Nationalux Canada, All rights reserved.</span>
    </div>
  );
}
