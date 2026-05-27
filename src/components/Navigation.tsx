import { Toolbar } from '@base-ui/react/toolbar';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <Toolbar.Root>
      <Toolbar.Group className={styles.group} aria-label="Navigation">
        <Toolbar.Link href="/">Home</Toolbar.Link>
        <Toolbar.Link href="/item">Item</Toolbar.Link>
        <Toolbar.Link href="/product">Product</Toolbar.Link>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        {/* Implement this with login later so users can save progress across devices */}
        {/* <Toolbar.Link /> */}
      </Toolbar.Group>
    </Toolbar.Root>
  );
}

export default Navigation;
