package path.planner.transportations;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import path.planner.locations.Location;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Transportations")
public class Transportation implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7039840009466060685L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long transportationId;

	@Size(min = 1, max = 255, message = "Nereden bilgisi 1-255 karakter uzunluğu aralığında olmalıdır.")
	@Column(name = "from_location", nullable = false)
	@NotNull(message = "Nereden bilgisi boş olamaz")
	private String fromLocation;

	@Size(min = 1, max = 255, message = "Nereye bilgisi 1-255 karakter uzunluğu aralığında olmalıdır.")
	@Column(name = "to_location", nullable = false)
	@NotNull(message = "Nereye bilgisi boş olamaz")
	private String toLocation;

	@Column(name = "transportation_type", nullable = false)
	@NotNull(message = "Araç tipi boş olamaz")
	private TransportationEnum transportationType;

	@Override
	public boolean equals(Object obj) {
		Transportation tr = (Transportation) obj;
		if (tr.getFromLocation().equals(this.getFromLocation()) && tr.getToLocation().equals(this.getToLocation())
				&& tr.getTransportationType() == this.getTransportationType()) {
			return true;
		} else {
			return false;
		}
	}
}
