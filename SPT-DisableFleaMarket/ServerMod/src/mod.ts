import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";

import { Traders } from "@spt/models/enums/Traders";

import { FluentAssortConstructor as FluentAssortCreator } from "./fluentTraderAssortCreator";
import { ItemTpl } from "@spt/models/enums/ItemTpl";
import { HashUtil } from "@spt/utils/HashUtil";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import {Money} from "@spt/models/enums/Money";

class Mod implements IPostDBLoadMod, IPreSptLoadMod
{
    private logger: ILogger;
    private fluentAssortCreator: FluentAssortCreator;

    public preSptLoad(container: DependencyContainer): void 
    {
        // Get SPT code/data we need later
        const hashUtil: HashUtil = container.resolve<HashUtil>("HashUtil");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.fluentAssortCreator = new FluentAssortCreator(hashUtil, this.logger);
    }

    public postDBLoad(container: DependencyContainer): void
    {

        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get a reference to the database tables
        const tables = databaseServer.getTables();

        // Get globals settings and set flea market min level to be 1
        tables.globals.config.RagFair.minUserLevel = 999;

        //#region Customs quest keys
        // Add Company director's room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_COMPANY_DIRECTORS_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_HORSE_FIGURINE, 2)
            .addBarterCost(ItemTpl.BARTER_CHAINLET, 3)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Dorm room 114 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_DORM_ROOM_114)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PC_CPU, 1)
            .addBarterCost(ItemTpl.BARTER_CPU_FAN, 2)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Dorm room 203 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_DORM_ROOM_203)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRINK_BOTTLE_OF_WATER_06L, 1)
            .addBarterCost(ItemTpl.FOOD_ARMY_CRACKERS, 1)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Dorm room 214 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_DORM_ROOM_214)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_AQUAPEPS_WATER_PURIFICATION_TABLETS, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Dorm room 220 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_DORM_ROOM_220)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_MEDICAL_BLOODSET, 1)
            .addBarterCost(ItemTpl.BARTER_DISPOSABLE_SYRINGE, 1)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Interchange quest keys
        // Add EMERCOM medical unit key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_EMERCOM_MEDICAL_UNIT)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_OPHTHALMOSCOPE, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add OLI logistics department office key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_OLI_LOGISTICS_DEPARTMENT_OFFICE)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PC_CPU, 1)
            .addBarterCost(ItemTpl.BARTER_CPU_FAN, 1)
            .addBarterCost(ItemTpl.BARTER_RAM_STICK, 4)
            .addBarterCost(ItemTpl.BARTER_PRINTED_CIRCUIT_BOARD, 1)
            .addBarterCost(ItemTpl.BARTER_DAMAGED_HARD_DRIVE, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Lighthouse quest keys
        // Add Radar station commandant room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RADAR_STATION_COMMANDANT_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PC_CPU, 5)
            .addBarterCost(ItemTpl.BARTER_RAM_STICK, 6)
            .addBarterCost(ItemTpl.BARTER_DAMAGED_HARD_DRIVE, 6)
            .addBarterCost(ItemTpl.INFO_SSD_DRIVE, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Rogue USEC barrack key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_ROGUE_USEC_BARRACK)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_BOLTS, 1)
            .addBarterCost(ItemTpl.BARTER_SCREW_NUTS, 2)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Water treatment plant storage room key
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_WATER_TREATMENT_PLANT_STORAGE_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_WATER_FILTER, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Operating room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_OPERATING_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_MEDICAL_TOOLS, 4)
            .addBarterCost(ItemTpl.BARTER_BOTTLE_OF_HYDROGEN_PEROXIDE, 3)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Reserve quest keys
        // Add RB-KSM key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBKSM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_BOTTLE_OF_OLOLO_MULTIVITAMINS, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add RB-OB key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBOB)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_GAS_ANALYZER, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // RB-ORB1 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBORB1)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_ENERGYSAVING_LAMP, 1)
            .addBarterCost(ItemTpl.BARTER_LIGHT_BULB, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add RB-ORB2 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBORB2)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_ENERGYSAVING_LAMP, 1)
            .addBarterCost(ItemTpl.BARTER_LIGHT_BULB, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add RB-ORB3 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBORB3)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_ENERGYSAVING_LAMP, 1)
            .addBarterCost(ItemTpl.BARTER_LIGHT_BULB, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add RB-SMP key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBSMP)
            .addStackCount(99)
            .addBarterCost(ItemTpl.MEDICAL_CMS_SURGICAL_KIT, 1) // 36000
            .addBarterCost(ItemTpl.MEDKIT_CAR_FIRST_AID_KIT, 2) // 9240
            .addBarterCost(ItemTpl.BARTER_MEDICAL_TOOLS, 2) // 7500
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add RB-ST key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RBST)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_GOLDEN_NECK_CHAIN, 2)
            .addBarterCost(ItemTpl.BARTER_CHAINLET, 3)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Shoreline quest keys
        // Add Health Resort west wing office room 112 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_WEST_WING_OFFICE_ROOM_112)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRINK_PACK_OF_MILK, 3)
            .addBarterCost(ItemTpl.FOOD_PACK_OF_SUGAR, 2)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort west wing room 216 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_WEST_WING_ROOM_216)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRUGS_AUGMENTIN_ANTIBIOTIC_PILLS, 1)
            .addBarterCost(ItemTpl.BARTER_BOTTLE_OF_OLOLO_MULTIVITAMINS, 2)
            .addBarterCost(ItemTpl.DRINK_AQUAMARI_WATER_BOTTLE_WITH_FILTER, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort west wing room 219 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_WEST_WING_ROOM_219)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRUGS_ANALGIN_PAINKILLERS, 1)
            .addBarterCost(ItemTpl.BARTER_PILE_OF_MEDS, 3)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort west wing room 220 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_WEST_WING_ROOM_220)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRUGS_VASELINE_BALM, 1)
            .addBarterCost(ItemTpl.BARTER_PILE_OF_MEDS, 6)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort west wing room 306 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_WEST_WING_ROOM_306)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRUGS_MORPHINE_INJECTOR, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort east wing room 306 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_EAST_WING_ROOM_306)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PC_CPU, 2)
            .addBarterCost(ItemTpl.BARTER_CPU_FAN, 4)
            .addBarterCost(ItemTpl.BARTER_RAM_STICK, 1)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort east wing room 308 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_EAST_WING_ROOM_308)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRUGS_ANALGIN_PAINKILLERS, 3)
            .addBarterCost(ItemTpl.MEDICAL_IMMOBILIZING_SPLINT, 5)
            .addBarterCost(ItemTpl.MEDICAL_ESMARCH_TOURNIQUET, 7)
            .addBarterCost(ItemTpl.MEDICAL_ASEPTIC_BANDAGE, 7)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort east wing room 328 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_EAST_WING_ROOM_328)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PC_CPU, 3)
            .addBarterCost(ItemTpl.BARTER_RAM_STICK, 1)
            .addBarterCost(ItemTpl.BARTER_DVD_DRIVE, 1)
            .addBarterCost(ItemTpl.BARTER_DAMAGED_HARD_DRIVE, 1)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Health Resort office key with a blue tape to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_HEALTH_RESORT_OFFICE_KEY_WITH_A_BLUE_TAPE)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_BOTTLE_OF_OLOLO_MULTIVITAMINS, 1)
            .addBarterCost(ItemTpl.BARTER_AQUAPEPS_WATER_PURIFICATION_TABLETS, 3)
            .addBarterCost(ItemTpl.BARTER_BOTTLE_OF_SALINE_SOLUTION, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Streets Of Tarkov quest keys
        // Add Iron gate key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_IRON_GATE)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRINK_BOTTLE_OF_PEVKO_LIGHT_BEER, 2)
            .addBarterCost(ItemTpl.FOOD_EMELYA_RYE_CROUTONS, 3)
            .addBarterCost(ItemTpl.FOOD_RYE_CROUTONS, 2)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Concordia security room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_CONCORDIA_SECURITY_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PC_CPU, 2)
            .addBarterCost(ItemTpl.BARTER_RAM_STICK, 3)
            .addBarterCost(ItemTpl.BARTER_DAMAGED_HARD_DRIVE, 2)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Pinewood hotel room 215 key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_PINEWOOD_HOTEL_ROOM_215)
            .addStackCount(99)
            .addBarterCost(ItemTpl.FOOD_MRE_RATION_PACK, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Chekannaya 15 apartment key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_CHEKANNAYA_15_APARTMENT)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_PHYSICAL_BITCOIN, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Beluga restaurant director key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_BELUGA_RESTAURANT_DIRECTOR)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_BROKEN_GPHONE_SMARTPHONE, 1)
            .addBarterCost(ItemTpl.BARTER_NIXXOR_LENS, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add TerraGroup meeting room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_TERRAGROUP_MEETING_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.INFO_SECURE_FLASH_DRIVE, 1)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);

        // Add "Negotiation" room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_NEGOTIATION_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_ELECTRONIC_COMPONENTS, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Relaxation room key
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_RELAXATION_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.DRINK_BOTTLE_OF_DAN_JACKIEL_WHISKEY, 1)
            .addLoyaltyLevel(3)
            .export(tables.traders[Traders.THERAPIST]);

        // Add X-ray room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_XRAY_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_GAS_ANALYZER,1)
            .addBarterCost(ItemTpl.BARTER_GEIGERMULLER_COUNTER,3)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.THERAPIST]);

        // Add Real estate agency office room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_REAL_ESTATE_AGENCY_OFFICE_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_CHAINLET,3)
            .addLoyaltyLevel(2)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region The Lab quest keys
        // Add TerraGroup Labs manager's office room key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_TERRAGROUP_LABS_MANAGERS_OFFICE_ROOM)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_AXEL_PARROT_FIGURINE, 1)
            .addLoyaltyLevel(4)
            .export(tables.traders[Traders.THERAPIST]);

        // Add TerraGroup Labs weapon testing area key to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_TERRAGROUP_LABS_WEAPON_TESTING_AREA)
            .addStackCount(99)
            .addBarterCost(ItemTpl.BARTER_BATTERED_ANTIQUE_BOOK, 1)
            .addLoyaltyLevel(4)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Keycards
        // Add TerraGroup storage room keycard to therapist
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEYCARD_TERRAGROUP_STORAGE_ROOM)
            .addStackCount(9999999)
            .addBuyRestriction(2)
            .addMoneyCost(Money.ROUBLES, 1415250)
            .addLoyaltyLevel(4)
            .export(tables.traders[Traders.THERAPIST]);
        //#endregion

        //#region Extract keys
        // Add Factory emergency exit key to Jaeger
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_FACTORY_EMERGENCY_EXIT)
            .addStackCount(99)
            .addBarterCost(ItemTpl.FOOD_MRE_RATION_PACK, 2)
            .addBarterCost(ItemTpl.FOOD_PACK_OF_INSTANT_NOODLES, 3)
            .addBarterCost(ItemTpl.FOOD_ARMY_CRACKERS, 3)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.JAEGER]);

        // Add ZB-014 key to Jaeger
        this.fluentAssortCreator
            .createSingleAssortItem(ItemTpl.KEY_ZB014)
            .addStackCount(99)
            .addBarterCost(ItemTpl.FOOD_ISKRA_RATION_PACK, 2)
            .addBarterCost(ItemTpl.FOOD_PACK_OF_TARKER_DRIED_MEAT, 3)
            .addBarterCost(ItemTpl.FOOD_ARMY_CRACKERS, 3)
            .addLoyaltyLevel(1)
            .export(tables.traders[Traders.JAEGER]);
        //#endregion
    }
}

export const mod = new Mod();
