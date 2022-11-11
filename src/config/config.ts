// for having system configurations that we used in this project.

const config = {
  local: {
    DB: {
      HOST: "localhost",
      PORT: "27017",
      DATABASE: "SDN",
      MONGOOSE: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      UserName: "",
      Password: "",
    },
    PORTNO: 8080,
  },
  staging: {
    DB: {
      HOST: "172.10.1.3",
      PORT: "27017",
      DATABASE: "pranalipatil",
      MONGOOSE: {
        useUndifiedTopology: true,
        useNewUrlParser: true,
      },
      UserName: "pranalipatil",
      Password: "pranalipatil78",
    },
    Email: {
      username: "patilpranali0022@gmail.com",
      password: "mmisuewacypanbgf",
      host: "smtp.gmail.com",
      port: 465,
    },
    PORTNO: 8080,
  },
};

export default config;
