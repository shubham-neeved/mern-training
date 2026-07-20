import { promises as dns } from "node:dns";

(async () => {
  try {
    const records = await dns.resolveSrv(
      "_mongodb._tcp.cluster0.3x62p2a.mongodb.net"
    );
    console.log(records);
  } catch (err) {
    console.error(err);
  }
})();