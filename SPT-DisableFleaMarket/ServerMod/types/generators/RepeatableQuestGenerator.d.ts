import { RepeatableQuestRewardGenerator } from "@spt/generators/RepeatableQuestRewardGenerator";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { RepeatableQuestHelper } from "@spt/helpers/RepeatableQuestHelper";
import { IExit } from "@spt/models/eft/common/ILocationBase";
import { ITraderInfo } from "@spt/models/eft/common/tables/IBotBase";
import { IQuestCondition, IQuestConditionCounterCondition } from "@spt/models/eft/common/tables/IQuest";
import { IRepeatableQuest } from "@spt/models/eft/common/tables/IRepeatableQuests";
import { IBossInfo, ICompletion, IEliminationConfig, IQuestConfig, IRepeatableQuestConfig } from "@spt/models/spt/config/IQuestConfig";
import { IQuestTypePool } from "@spt/models/spt/repeatable/IQuestTypePool";
import type { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { DatabaseService } from "@spt/services/DatabaseService";
import { LocalisationService } from "@spt/services/LocalisationService";
import { HashUtil } from "@spt/utils/HashUtil";
import { MathUtil } from "@spt/utils/MathUtil";
import { ProbabilityObjectArray, RandomUtil } from "@spt/utils/RandomUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class RepeatableQuestGenerator {
    protected logger: ILogger;
    protected hashUtil: HashUtil;
    protected randomUtil: RandomUtil;
    protected mathUtil: MathUtil;
    protected databaseService: DatabaseService;
    protected itemHelper: ItemHelper;
    protected localisationService: LocalisationService;
    protected repeatableQuestHelper: RepeatableQuestHelper;
    protected repeatableQuestRewardGenerator: RepeatableQuestRewardGenerator;
    protected configServer: ConfigServer;
    protected cloner: ICloner;
    protected questConfig: IQuestConfig;
    protected maxRandomNumberAttempts: number;
    constructor(logger: ILogger, hashUtil: HashUtil, randomUtil: RandomUtil, mathUtil: MathUtil, databaseService: DatabaseService, itemHelper: ItemHelper, localisationService: LocalisationService, repeatableQuestHelper: RepeatableQuestHelper, repeatableQuestRewardGenerator: RepeatableQuestRewardGenerator, configServer: ConfigServer, cloner: ICloner);
    /**
     * This method is called by /GetClientRepeatableQuests/ and creates one element of quest type format (see assets/database/templates/repeatableQuests.json).
     * It randomly draws a quest type (currently Elimination, Completion or Exploration) as well as a trader who is providing the quest
     * @param sessionId Session id
     * @param pmcLevel Player's level for requested items and reward generation
     * @param pmcTraderInfo Players traper standing/rep levels
     * @param questTypePool Possible quest types pool
     * @param repeatableConfig Repeatable quest config
     * @returns IRepeatableQuest
     */
    generateRepeatableQuest(sessionId: string, pmcLevel: number, pmcTraderInfo: Record<string, ITraderInfo>, questTypePool: IQuestTypePool, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
    /**
     * Generate a randomised Elimination quest
     * @param pmcLevel Player's level for requested items and reward generation
     * @param traderId Trader from which the quest will be provided
     * @param questTypePool Pools for quests (used to avoid redundant quests)
     * @param repeatableConfig The configuration for the repeatably kind (daily, weekly) as configured in QuestConfig for the requestd quest
     * @returns Object of quest type format for "Elimination" (see assets/database/templates/repeatableQuests.json)
     */
    protected generateEliminationQuest(sessionid: string, pmcLevel: number, traderId: string, questTypePool: IQuestTypePool, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
    /**
     * Get a number of kills neded to complete elimination quest
     * @param targetKey Target type desired e.g. anyPmc/bossBully/Savage
     * @param targetsConfig Config
     * @param eliminationConfig Config
     * @returns Number of AI to kill
     */
    protected getEliminationKillCount(targetKey: string, targetsConfig: ProbabilityObjectArray<string, IBossInfo>, eliminationConfig: IEliminationConfig): number;
    /**
     * A repeatable quest, besides some more or less static components, exists of reward and condition (see assets/database/templates/repeatableQuests.json)
     * This is a helper method for GenerateEliminationQuest to create a location condition.
     *
     * @param   {string}    location        the location on which to fulfill the elimination quest
     * @returns {IEliminationCondition}     object of "Elimination"-location-subcondition
     */
    protected generateEliminationLocation(location: string[]): IQuestConditionCounterCondition;
    /**
     * Create kill condition for an elimination quest
     * @param target Bot type target of elimination quest e.g. "AnyPmc", "Savage"
     * @param targetedBodyParts Body parts player must hit
     * @param distance Distance from which to kill (currently only >= supported
     * @param allowedWeapon What weapon must be used - undefined = any
     * @param allowedWeaponCategory What category of weapon must be used - undefined = any
     * @returns IEliminationCondition object
     */
    protected generateEliminationCondition(target: string, targetedBodyParts: string[], distance: number, allowedWeapon: string, allowedWeaponCategory: string): IQuestConditionCounterCondition;
    /**
     * Generates a valid Completion quest
     *
     * @param   {integer}   pmcLevel            player's level for requested items and reward generation
     * @param   {string}    traderId            trader from which the quest will be provided
     * @param   {object}    repeatableConfig    The configuration for the repeatably kind (daily, weekly) as configured in QuestConfig for the requestd quest
     * @returns {object}                        object of quest type format for "Completion" (see assets/database/templates/repeatableQuests.json)
     */
    protected generateCompletionQuest(sessionId: string, pmcLevel: number, traderId: string, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
    /**
     * A repeatable quest, besides some more or less static components, exists of reward and condition (see assets/database/templates/repeatableQuests.json)
     * This is a helper method for GenerateCompletionQuest to create a completion condition (of which a completion quest theoretically can have many)
     * @param itemTpl Tpl of item to add create condition around
     * @param value Number of items to add to condition
     * @param completionConfig completion config from quest.json
     * @returns Quest condition object
     */
    protected generateCompletionAvailableForFinish(itemTpl: string, value: number, completionConfig: ICompletion): IQuestCondition;
    /**
     * Generates a valid Exploration quest
     *
     * @param   {integer}   pmcLevel            player's level for reward generation
     * @param   {string}    traderId            trader from which the quest will be provided
     * @param   {object}    questTypePool       Pools for quests (used to avoid redundant quests)
     * @param   {object}    repeatableConfig    The configuration for the repeatably kind (daily, weekly) as configured in QuestConfig for the requestd quest
     * @returns {object}                        object of quest type format for "Exploration" (see assets/database/templates/repeatableQuests.json)
     */
    protected generateExplorationQuest(sessionId: string, pmcLevel: number, traderId: string, questTypePool: IQuestTypePool, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
    /**
     * Filter a maps exits to just those for the desired side
     * @param locationKey Map id (e.g. factory4_day)
     * @param playerSide Scav/Pmc
     * @returns Array of Exit objects
     */
    protected getLocationExitsForSide(locationKey: string, playerSide: string): IExit[];
    protected generatePickupQuest(sessionId: string, pmcLevel: number, traderId: string, questTypePool: IQuestTypePool, repeatableConfig: IRepeatableQuestConfig): IRepeatableQuest;
    /**
     * Convert a location into an quest code can read (e.g. factory4_day into 55f2d3fd4bdc2d5f408b4567)
     * @param locationKey e.g factory4_day
     * @returns guid
     */
    protected getQuestLocationByMapId(locationKey: string): string;
    /**
     * Exploration repeatable quests can specify a required extraction point.
     * This method creates the according object which will be appended to the conditions array
     *
     * @param   {string}        exit                The exit name to generate the condition for
     * @returns {object}                            Exit condition
     */
    protected generateExplorationExitCondition(exit: IExit): IQuestConditionCounterCondition;
    /**
     * Generates the base object of quest type format given as templates in assets/database/templates/repeatableQuests.json
     * The templates include Elimination, Completion and Extraction quest types
     *
     * @param   {string}    type            Quest type: "Elimination", "Completion" or "Extraction"
     * @param   {string}    traderId        Trader from which the quest will be provided
     * @param   {string}    side            Scav daily or pmc daily/weekly quest
     * @returns {object}                    Object which contains the base elements for repeatable quests of the requests type
     *                                      (needs to be filled with reward and conditions by called to make a valid quest)
     */
    protected generateRepeatableTemplate(type: string, traderId: string, side: string, sessionId: string): IRepeatableQuest;
}
