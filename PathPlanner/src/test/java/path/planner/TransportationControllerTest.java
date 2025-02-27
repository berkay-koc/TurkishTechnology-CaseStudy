package path.planner;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import path.planner.transportations.Transportation;
import path.planner.transportations.TransportationController;
import path.planner.transportations.TransportationEnum;
import path.planner.transportations.TransportationService;

@WebMvcTest(TransportationController.class)
class TransportationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransportationService transportationService;

    @Test
    void fetchAllTransportations_ShouldReturnTransportationList() throws Exception {
        
        Transportation transportation1 = new Transportation();
        transportation1.setTransportationId(1L);
        transportation1.setFromLocation("SAW");
        transportation1.setToLocation("ESB");
        transportation1.setTransportationType(TransportationEnum.FLIGHT);

        Transportation transportation2 = new Transportation();
        transportation2.setTransportationId(2);
        transportation2.setFromLocation("IST");
        transportation2.setToLocation("ADB");
        transportation2.setTransportationType(TransportationEnum.BUS);

        List<Transportation> transportations = Arrays.asList(transportation1, transportation2);

        when(transportationService.fetchAllTransportations()).thenReturn(transportations);

        mockMvc.perform(get("/transportation/fetch"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].fromLocation").value("SAW"))
                .andExpect(jsonPath("$[0].toLocation").value("ESB"))
                .andExpect(jsonPath("$[1].fromLocation").value("IST"))
                .andExpect(jsonPath("$[1].toLocation").value("ADB"));

        verify(transportationService, times(1)).fetchAllTransportations();
    }
}
