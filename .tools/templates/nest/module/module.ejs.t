---
to: <%= h.src() %>/modules/<%= name %>/<%= name %>.module.ts
Name: <%= Name = h.capitalize(name) %>
---
import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';

import { <%= Name %> } from 'src/modules/<%= name %>/entity/<%= name %>.entity';
import { <%= Name %>Profile } from 'src/modules/<%= name %>/profile/<%= name %>.profile';
import { <%= Name %>Repository } from 'src/modules/<%= name %>/repository/<%= name %>.repository';
import { <%= Name %>AdminController } from 'src/modules/<%= name %>/web/admin/<%= name %>.admin.controller';
import { <%= Name %>AdminService } from 'src/modules/<%= name %>/web/admin/<%= name %>.admin.service';

import { <%= Name %>ClientController } from 'src/modules/<%= name %>/web/client/<%= name %>.client.controller';
import { <%= Name %>ClientService } from 'src/modules/<%= name %>/web/client/<%= name %>.client.service';

const Models = [<%= Name %>];
const Repositories = [
  <%= Name %>Repository
];
const Controllers = [<%= Name %>AdminController, <%= Name %>ClientController];
const Services = [<%= Name %>AdminService, <%= Name %>ClientService];

@Module({
  imports: [SequelizeModulePackage.forFeature(Models)],
  controllers: [...Controllers],
  providers: [<%= Name %>Profile, ...Services, ...Repositories],
  exports: [...Services, ...Repositories],
})
export class <%= Name %>Module {}
