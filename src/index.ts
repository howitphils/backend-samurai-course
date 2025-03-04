import { app } from "./app";
import { settings } from "./settings";

app.listen(settings.PORT, () => {
  console.log(`listening on port ${settings.PORT}`);
});
