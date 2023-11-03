import SoftwareExtend from "@/main/core/software/SoftwareExtend";
import SoftwareInit from "@/main/core/software/SoftwareInit";
import Directory from "@/main/utils/Directory";
import GetPath from "@/shared/utils/GetPath";
import Database from "@/main/core/Database";

export default class CommonInstall {
    static async configure(dirName) {
        if (dirName.match(/^mysql-[.\d]+$/)) {
            let version = SoftwareExtend.getMysqlVersion(dirName);
            await SoftwareInit.initMySQLConf(version);
            if (!Directory.Exists(GetPath.getMysqlDataDir(version))) {
                await Database.initMySQL(version);
            }
        } else if (dirName.match(/^php-[.\d]+$/)) {
            let version = SoftwareExtend.getPHPVersion(dirName);
            await SoftwareInit.initPHP(version);
        } else if (dirName.match(/^nginx$/)) {
            await SoftwareInit.initNginx();
        }
    }
}