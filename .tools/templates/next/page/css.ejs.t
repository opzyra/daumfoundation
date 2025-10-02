---
to: <%= h.src() %>/pages/<% if(path){ -%><%= path %>/<% }-%><%= name %>/<%= name %>.css
Name: <%= Name = h.capitalize(name) %>
---
.<%= name %> {}

.<%= name %>-container {}