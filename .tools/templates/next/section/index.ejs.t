---
to: <%= h.src() %>/pages/<% if(path){ -%><%= path %>/<% }-%>__<%= name %>/<%= name %>.tsx
Name: <%= Name = h.capitalize(name) %>
---
import from './<%= name %>.css';

interface <%= Name %>Props {}

function <%= Name %>({}:<%= Name %>Props) {
  return <div className={styles.<%= Name %>}></div>;
}

export default <%= Name %>;
