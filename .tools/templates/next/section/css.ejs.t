---
to: <%= h.src() %>/pages/<% if(path){ -%><%= path %>/<% }-%>__<%= Name %>/<%= Name %>.css
Name: <%= Name = h.capitalize(name) %>
---
.<%= name %> {}
