---
to: <%= h.src() %>/components/<%= name %>/<%= name %>.tsx
Name: <%= Name = h.capitalize(name) %>
---
import from './<%= name %>.css';

interface <%= Name %>Props {}

function <%= Name %>({}:<%= Name %>Props) {
  return <div className={<%= name %>}></div>;
}

export default <%= Name %>;
