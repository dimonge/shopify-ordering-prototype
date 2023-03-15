export default function makeGetWebhook({ webhooksDb }: any) {
  return async function getWebhook({ id }: any) {
    const webhook = await webhooksDb.findById({ id });

    if (!webhook) {
      return null;
    }

    return webhook;
  };
}
