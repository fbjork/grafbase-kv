import { graph, config } from "@grafbase/sdk";

const g = graph.Standalone();

g.query("instruct", {
  args: {
    prompt: g.string(),
  },
  returns: g.string(),
  resolver: "query/instruct",
});

export default config({
  graph: g,
  experimental: {
    kv: true,
  },
});
