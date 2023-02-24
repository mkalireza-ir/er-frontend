module.exports = {
  apps: [
    {
      name: "next",
      cwd: "/home/ubuntu/er-frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
