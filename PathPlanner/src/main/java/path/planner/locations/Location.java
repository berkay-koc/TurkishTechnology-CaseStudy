package path.planner.locations;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Locations")
@Getter
@Setter
@NoArgsConstructor
public class Location implements Serializable{
	
	private static final long serialVersionUID = 5388524142292892126L;
	
	@Size(min = 1, max = 255, message = "Lokasyon ismi 1-255 karakter uzunluğu aralığında olmalıdır.")
	@Column(name = "name", nullable = false)
	@NotNull(message = "Lokasyon ismi boş olamaz")
	private String name;
	
	@Size(min = 1, max = 255, message = "Ülke ismi 1-255 karakter uzunluğu aralığında olmalıdır.")
	@Column(name = "country", nullable = false)
	@NotNull(message = "Ülke ismi boş olamaz")
	private String country;
	
	@Size(min = 1, max = 255, message = "Şehir ismi 1-255 karakter uzunluğu aralığında olmalıdır.")
	@Column(name = "city", nullable = false)
	@NotNull(message = "Şehir ismi boş olamaz")
	private String city;
	
	@Column(name = "location_code", nullable = false)
	@Id
	@NotNull(message = "Lokasyon kodu boş olamaz")
	@Size(min = 1, max = 255, message = "Lokasyon kodu 1-255 karakter uzunluğu aralığında olmalıdır.")
	private String locationCode;

}
