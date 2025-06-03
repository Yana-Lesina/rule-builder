import type { ReactNode } from 'react';

interface AccessGuardProps {
  haveAccessRights: boolean;
  children: ReactNode;
  fallback?: ReactNode | null;
}

export const AccessGuard = ({ haveAccessRights, children, fallback = null }: AccessGuardProps) => {
  return haveAccessRights ? <>{children}</> : <>{fallback}</>;
};
