using BepInEx;
using BepInEx.Logging;
using SPT_DisableFleaMarket.Patches;

namespace SPT_DisableFleaMarket
{
  [BepInPlugin("com.DragonX86.DisableFleaMarket", "Disable Flea Market", "1.0.0")]
  public class Plugin: BaseUnityPlugin
  {
    public static ManualLogSource LogSource;
    
    private void Awake()
    {
      LogSource = Logger;
      LogSource.LogInfo("The Disable Flea Market mod has loaded.");

      new FleaButtonPatch().Enable();
      new FleaWarningPatch().Enable();
    }
  }
}