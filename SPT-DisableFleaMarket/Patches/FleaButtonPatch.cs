using System;
using System.Collections.Generic;
using System.Reflection;
using SPT.Reflection.Patching;
using EFT.UI;
using HarmonyLib;

namespace SPT_DisableFleaMarket.Patches
{
    public class FleaButtonPatch: ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return AccessTools.Method(typeof(MenuTaskBar), "Awake");
        }
        
        [PatchPostfix]
        static void Postfix(MenuTaskBar __instance)
        {
            try
            {
                var toggleButtonsField = AccessTools.Field(typeof(MenuTaskBar), "_toggleButtons");

                if (toggleButtonsField.GetValue(__instance) is Dictionary<EMenuType, AnimatedToggle> toggleButtons 
                    && toggleButtons.TryGetValue(EMenuType.RagFair, out var fleaMarketToggle))
                {
                    if (fleaMarketToggle != null && fleaMarketToggle.gameObject != null)
                    {
                        var parentObject = fleaMarketToggle.transform.parent.gameObject;
                        parentObject.SetActive(false);

                        Plugin.LogSource.LogInfo("Flea Market Button disabled.");
                    }
                    else
                    {
                        Plugin.LogSource.LogWarning("Flea Market Button not found in _toggleButtons.");
                    }
                }
                else
                {
                    Plugin.LogSource.LogWarning("Flea Market Button not found in _toggleButtons.");
                }
            }
            catch (Exception ex)
            {
                Plugin.LogSource.LogError($"Error: {ex.Message}");
            }
        }
    }
}