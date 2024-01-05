import { Link } from 'react-router-dom';
import React from 'react';
import styles from './side-bar-menu.module.scss';

interface SideBarMenuItemProps {
  title: string;
  url: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  activeIcon: string | any; // any type is assigned for static image
  baseIcon: string | any; // any type is assigned for static image
  active?: boolean;
  showNav?: boolean;
  optionalIcon?: string;
}

const SidebarMenuItem: React.FC<SideBarMenuItemProps> = ({
  active,
  baseIcon,
  activeIcon,
  url,
  title,
  className,
  onClick,
}) => {
  return (
    <Link to={url || '/'} className={styles.link}>
      <div
        className={`${styles.sidebarItem} ${
          active ? styles.active : styles.base
        } ${className}`}
        onClick={onClick}
        title={title}
      >
        <div className={styles.icon}>
          <img src={active ? activeIcon : baseIcon} alt={title} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </Link>
  );
};

export default SidebarMenuItem;
