import NextLink from "next/link";

import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";

function Link({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ children, href, exact, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function InputGroupTextSelect(props) {
  const { textHeader, textPlaceholder, ariaLabel, object, isReadonly } = props;

  function setFocusToTextInput(ev) {
    return ev.target.nextElementSibling.focus();
  }

  if (!object) return null;
  return (
    <InputGroup className={props.className}>
      <InputGroup.Text onClick={setFocusToTextInput}>
        {textHeader}
      </InputGroup.Text>
      <Form.Control
        aria-label={ariaLabel}
        placeholder={textPlaceholder}
        value={object.value}
        onChange={object.onChange}
        readOnly={isReadonly}
      />
      <Form.Select
        aria-label={ariaLabel}
        value={object.value}
        onChange={object.onChange}
      >
        <option key="default-key" value="">
          Выберите из списка ...
        </option>
        {object.list}
      </Form.Select>
    </InputGroup>
  );
}

export { NavLink };
export { Link };
export { InputGroupTextSelect };
