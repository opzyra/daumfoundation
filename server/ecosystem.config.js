module.exports = {
  apps: [
    {
      name: process.env.npm_config_name || 'server',
      script: './dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      wait_ready: false,
      listen_timeout: 50000,
      kill_timeout: 5000,
      max_memory_restart: '512M',
    },
  ],
};
