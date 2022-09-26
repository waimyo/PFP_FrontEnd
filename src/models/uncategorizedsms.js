export default class UnCategorizedSMS {
    constructor(Id, Direction, Sms_Code, DataInfo_id, Sms_Time, Sms_Text, Campaign_Id, Message_Type, Operator, Reason, ministry_id) {
        this.Id = Id;
        this.Direction = Direction;
        this.Sms_Code = Sms_Code;
        this.DataInfo_id = DataInfo_id;
        this.Sms_Time = Sms_Time;
        this.Sms_Text = Sms_Text;
        this.Campaign_Id = Campaign_Id;
        this.Message_Type = Message_Type;
        this.Operator = Operator;
        this.Reason = Reason;
        this.ministry_id = ministry_id;
    }
}

