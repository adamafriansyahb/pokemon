import { motion, Transition, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const dotStyle = 'h-7 w-7 rounded-full';

const dotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

const dotVariants: Variants = {
  start: { scale: 0.4 },
  end: { scale: 1 },
};

const containerVariants: Variants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    }
  },
};

const Loader = () => {
  return (
    <motion.div
      animate="end"
      className="flex justify-center items-center space-x-3 mt-10"
      initial="start"
      variants={containerVariants}
    >
      <motion.span
        className={cn('bg-emerald-400', dotStyle)}
        transition={dotTransition}
        variants={dotVariants}
      />
      <motion.span
        className={cn('bg-gradient-to-r from-emerald-400 to-blue-400', dotStyle)}
        transition={dotTransition}
        variants={dotVariants}
      />
      <motion.span
        className={cn('bg-blue-400', dotStyle)}
        transition={dotTransition}
        variants={dotVariants}
      />
    </motion.div>
  );
};

export default Loader;
