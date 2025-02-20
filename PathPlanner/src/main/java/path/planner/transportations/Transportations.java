package path.planner.transportations;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import path.planner.locations.Location;

@Data
@Entity
@Table(name = "Transportations")
public class Transportations implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7039840009466060685L;
	@Id
	long transportationId;
	Location fromLocation;
	Location toLocation;
	TransportationEnum transportationType;
}
