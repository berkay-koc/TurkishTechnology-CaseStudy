package path.planner.transportations;

public enum TransportationEnum {

	FLIGHT(0), BUS(1), SUBWAY(2), UBER(3);
	
	public final Integer code;
	
	private TransportationEnum(Integer code) {
		this.code = code;
	}
	
	public Integer getCode() {
		return this.code;
	}
}
