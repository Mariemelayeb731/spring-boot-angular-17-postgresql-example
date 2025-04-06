@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testCreateUser() {
        User user = new User("Maryem", "maryem@example.com");
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        User result = userService.createUser(user);
        assertNotNull(result);
        assertEquals("Maryem", result.getName());
    }
}
