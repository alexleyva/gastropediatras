import type { LucideProps } from 'lucide-react';
import {
  LayoutDashboard,
  FilePlus2,
  Users2,
  Beaker,
  Settings2,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  User,
  HeartPulse,
  Menu,
  X,
  CalendarDays,
  ClipboardList,
  Ruler,
  FileText,
  ShieldCheck,
  History,
  Stethoscope,
  TestTube2,
  NotebookText,
  UploadCloud,
  DownloadCloud,
  Eye,
  Search,
  FileEdit,
  Trash2,
  MoreHorizontal,
  ActivitySquare
} from 'lucide-react';

export const Icons = {
  LayoutDashboard,
  FilePlus2,
  Users2,
  Beaker,
  Settings2,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  User,
  HeartPulse,
  Menu,
  X,
  CalendarDays,
  ClipboardList,
  Ruler,
  FileText,
  ShieldCheck,
  History,
  Stethoscope,
  TestTube2,
  NotebookText,
  UploadCloud,
  DownloadCloud,
  Eye,
  Search,
  FileEdit,
  Trash2,
  MoreHorizontal,
  ActivitySquare
};

export type IconKeys = keyof typeof Icons;

interface IconProps extends LucideProps {
  name: IconKeys;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) {
    // Fallback icon or handle error
    return <HeartPulse {...props} />;
  }
  return <LucideIcon {...props} />;
};
