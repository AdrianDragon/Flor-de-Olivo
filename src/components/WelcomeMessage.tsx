import React from 'react';
import { useAuth } from '../context/AuthContext';

interface WelcomeMessageProps {
  showRole?: boolean;
  className?: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ 
  showRole = true,
  className = ''
}) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user || !user.profile) {
    return null;
  }
  
  const name = user.profile?.name || user.email?.split('@')[0] || 'Usuario';
  const timeOfDay = getTimeOfDay();
  
  return (
    <div className={`text-olive-800 ${className}`}>
      <p className="font-medium">
        ¡{getGreeting(timeOfDay)}, {name}!
      </p>
      
      {showRole && user.profile?.role && (
        <p className="text-sm text-olive-600 mt-1">
          Acceso como: {getRoleDisplay(user.profile.role)}
        </p>
      )}
    </div>
  );
};

// Helper function to get the time of day
const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

// Helper function to get the appropriate greeting based on time of day
const getGreeting = (timeOfDay: 'morning' | 'afternoon' | 'evening'): string => {
  switch (timeOfDay) {
    case 'morning':
      return 'Buenos días';
    case 'afternoon':
      return 'Buenas tardes';
    case 'evening':
      return 'Buenas noches';
    default:
      return 'Bienvenido';
  }
};

// Helper function to get role display text
const getRoleDisplay = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'manager':
      return 'Gerente';
    case 'customer':
      return 'Cliente';
    default:
      return role;
  }
};

export default WelcomeMessage; 