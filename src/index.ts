import { app } from "./app";
import { SETTINGS } from "./settings";

app.listen(SETTINGS.PORT, () => {
  console.log(`listening on port ${SETTINGS.PORT}`);
});
