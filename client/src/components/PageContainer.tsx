import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function PageContainer({ children, title, description, action }: PageContainerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="md:pl-64 min-h-screen bg-background pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || action) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              {title && <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>}
              {description && <p className="mt-2 text-muted-foreground text-lg">{description}</p>}
            </div>
            {action && (
              <div className="flex-shrink-0">
                {action}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
}
